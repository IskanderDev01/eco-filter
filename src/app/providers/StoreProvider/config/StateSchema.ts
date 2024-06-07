import {
    ReducersMapObject,
    AnyAction,
    CombinedState,
    Reducer,
    EnhancedStore,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ClientSchema } from 'features/AddClient';
import { CommentShema } from 'features/AddComment/model/types/CommentShema';
import { FilterSchema } from 'features/AddFilter/model/types/FiltersSchema';
import { LoginSchema } from 'features/AuthByUsername';
import { UpdateClientShema } from 'features/UpdateClient/model/types/CLientSchema';
import { UpdateCommentShema } from 'features/UpdateComment/model/types/UpdateCommentShema';
import { AllClientsSchema } from 'pages/MainPage';
import { UserSchema } from 'pages/UserPage/models/types/UserSchema';

export interface StateSchema {
    addClientForm?: ClientSchema;
    allClients?: AllClientsSchema;
    login?: LoginSchema;
    comment?: CommentShema;
    filter?: FilterSchema;
    user?: UserSchema;
    userUpdate?: UpdateClientShema;
    updateComment?: UpdateCommentShema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // true - вмонтирован, false - демонтирован
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    state: StateSchema;
    extra: ThunkExtraArg;
}
