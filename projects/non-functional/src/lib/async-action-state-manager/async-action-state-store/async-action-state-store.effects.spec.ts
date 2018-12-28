import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, combineReducers, StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as AsyncStateActions from './async-action-state-store.actions';
import { AsyncActionError, AsyncActionStart, AsyncActionSuccess } from './async-action-state-store.decorator';
import { AsyncActionStateEffects, ResetNextAsyncActionEffectsId } from './async-action-state-store.effects';
import * as AsyncStateModels from './async-action-state-store.models';
import { reducer } from './async-action-state-store.reducer';

describe('AsyncActionStateEffects', () => {
    let effects: AsyncActionStateEffects;
    let actions$: Observable<any>;

    beforeEach(() => {
        ResetNextAsyncActionEffectsId();
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    flight: combineReducers(reducer),
                }),
            ],
            providers: [
                AsyncActionStateEffects,
                provideMockActions(() => actions$),
            ],
        });

        effects = TestBed.get(AsyncActionStateEffects);
        actions$ = TestBed.get(Actions);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('duplicate instance creation not allowed', () => {
        expect(() => new AsyncActionStateEffects(actions$)).toThrowError();
    });

    describe('asyncStateUpdater$', () => {
        const responseAction1 = new AsyncStateActions.Start('Test');
        const responseAction2 = new AsyncStateActions.Success('Test');
        const responseAction3 = new AsyncStateActions.Error('Test');


        class TestAction1 implements AsyncStateModels.AsyncAction {
            readonly type = 'TestAction1';
            readonly asyncActionState: AsyncStateModels.AsyncActionState = {
                asyncActionId: 'Test',
                status: AsyncStateModels.AsyncStatus.Start
            };
            constructor() { }
        }
        class TestAction2 implements AsyncStateModels.AsyncAction {
            readonly type = 'TestAction2';
            readonly asyncActionState: AsyncStateModels.AsyncActionState = {
                asyncActionId: 'Test',
                status: AsyncStateModels.AsyncStatus.Success
            };
            constructor() { }
        }
        class TestAction3 implements AsyncStateModels.AsyncAction {
            readonly type = 'TestAction3';
            readonly asyncActionState: AsyncStateModels.AsyncActionState = {
                asyncActionId: 'Test',
                status: AsyncStateModels.AsyncStatus.Error
            };
            constructor() { }
        }

        @AsyncActionStart('Test')
        class TestAction4 implements Action {
            readonly type = 'TestAction1';
            constructor() { }
        }

        @AsyncActionSuccess('Test')
        class TestAction5 implements Action {
            readonly type = 'TestAction2';
            constructor() { }
        }

        @AsyncActionError('Test')
        class TestAction6 implements Action {
            readonly type = 'TestAction3';
            constructor() { }
        }

        const action1 = new TestAction1();
        const action2 = new TestAction2();
        const action3 = new TestAction3();
        const action4 = new TestAction4();
        const action5 = new TestAction5();
        const action6 = new TestAction6();

        it('should not process asyncstate action', () => {
            actions$ = hot('-a-b-c-', { a: responseAction1, b: responseAction2, c: responseAction3 });
            const expected = cold('-------', {});

            expect(effects.asyncStateUpdater$).toBeObservable(expected);
        });

        it('should process valid action', () => {
            actions$ = hot('-a-b-c-', { a: action1, b: action2, c: action3 });
            const expected = cold('-a-b-c-', { a: responseAction1, b: responseAction2, c: responseAction3 });

            expect(effects.asyncStateUpdater$).toBeObservable(expected);
        });

        it('should process valid decorated action', () => {
            actions$ = hot('-a-b-c-', { a: action4, b: action5, c: action6 });
            const expected = cold('-a-b-c-', { a: responseAction1, b: responseAction2, c: responseAction3 });

            expect(effects.asyncStateUpdater$).toBeObservable(expected);
        });

    });
});
