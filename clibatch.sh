# set -x
# rm -r sampleapp1
# rm -r foo
# mkdir foo
# cd foo
# yarn add @angular/cli
# cd ..
# git clone https://github.com/ttestman4/sampleapp1.git
# cd sampleapp1
# git checkout -b develop
# cd ..
# foo/node_modules/.bin/ng --version
# foo/node_modules/.bin/ng new --help
# foo/node_modules/.bin/ng new spa -p spa --directory sampleapp1 --routing --skip-install --style scss --view-encapsulation None -g -v
# cd sampleapp1
# yarn
# yarn ng g library non-functional
# yarn ng g module CustomLogger --project non-functional -m non-functional.module
# yarn add ngx-logger
# yarn ng g module AppErrorHandler --project non-functional -m non-functional.module
# yarn ng g service app-error-handler/AppErrorHandler --project non-functional -m app-error-handler/app-error-handler.module
# yarn ng g module AsyncActionStateManager --project non-functional -m non-functional.module --dry-run
# yarn ng g module async-action-state-manager/AsyncActionStateStore --project non-functional -m async-action-state-manager/async-action-state-manager.module --dry-run
# yarn ng g module async-action-state-manager/AsyncActionStateComponent --project non-functional -m async-action-state-manager/async-action-state-manager.module --dry-run
# yarn ng g component async-action-state-manager/async-action-state-component/AsyncStateIndicator --project non-functional -m async-action-state-manager/async-action-state-component/async-action-state-component.module --export --dry-run

# yarn ng g module HttpConfiguration --project non-functional -m non-functional.module --dry-run
# yarn ng g service http-configuration/HttpErrorLogger --project non-functional --dry-run

# yarn add @angular-devkit/{core,schematics} @ngrx/{store-devtools,schematics} --dev
# yarn add @ngrx/{store,effects,entity} ngrx-store-freeze
# # yarn run ng config cli.defaultCollection @ngrx/schematics

# yarn ng g module RootStore --project non-functional -m non-functional.module --dry-run

# yarn ng g library FeatureStore
# yarn ng g module ConfigDataStore --project feature-store
# yarn ng g service config-data-store/config-data-store.service --project feature-store --dry-run

# yarn ng g module search  -m app.module
# yarn ng g component search  -m search/search.module
# yarn ng g module result  -m app.module
# yarn ng g component result  -m result/result.module
# yarn ng g service search/ArirportValidatior --dry-run

# yarn ng g m CustomPipe -m non-functional --project non-functional
# yarn ng g pipe custom-pipe/time -m custom-pipe/custom-pipe --project non-functional  --export --dry-run
# yarn ng g pipe custom-pipe/duration -m custom-pipe/custom-pipe --project non-functional  --export --dry-run
