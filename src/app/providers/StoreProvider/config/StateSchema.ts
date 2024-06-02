import { ReducersMapObject, AnyAction, CombinedState, Reducer, EnhancedStore } from '@reduxjs/toolkit'
import { ClientSchema } from 'features/AddClient';
import { AllClientsSchema } from 'pages/MainPage';

export interface StateSchema {
    addClientForm?: ClientSchema;
    allClients?: AllClientsSchema;
}


export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // true - вмонтирован, false - демонтирован
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}


export interface ThunkConfig<T> {
    rejectValue: T;
    state: StateSchema;
}
