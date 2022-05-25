import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Category = {
  __typename?: 'Category';
  cover?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type LikePhoto = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  likeAnonymousPhoto?: Maybe<Photo>;
  likePhoto?: Maybe<Photo>;
  login?: Maybe<Scalars['String']>;
  signup?: Maybe<Scalars['String']>;
};


export type MutationLikeAnonymousPhotoArgs = {
  input: LikePhoto;
};


export type MutationLikePhotoArgs = {
  input: LikePhoto;
};


export type MutationLoginArgs = {
  input: UserCredentials;
};


export type MutationSignupArgs = {
  input: UserCredentials;
};

export type Photo = {
  __typename?: 'Photo';
  categoryId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  liked?: Maybe<Scalars['Boolean']>;
  likes?: Maybe<Scalars['Int']>;
  src?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Maybe<Category>>>;
  favs?: Maybe<Array<Maybe<Photo>>>;
  photo?: Maybe<Photo>;
  photos?: Maybe<Array<Maybe<Photo>>>;
};


export type QueryPhotoArgs = {
  id: Scalars['ID'];
};


export type QueryPhotosArgs = {
  categoryId?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isPremium?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type UserCredentials = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type GetFavsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFavsQuery = { __typename?: 'Query', favs?: Array<{ __typename?: 'Photo', id?: string | null, categoryId?: number | null, src?: string | null, likes?: number | null, userId?: string | null } | null> | null };

export type GetSinglePhotoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSinglePhotoQuery = { __typename?: 'Query', photo?: { __typename?: 'Photo', id?: string | null, categoryId?: number | null, src?: string | null, likes?: number | null, liked?: boolean | null, userId?: string | null } | null };

export type LikePhotoMutationVariables = Exact<{
  input: LikePhoto;
}>;


export type LikePhotoMutation = { __typename?: 'Mutation', likePhoto?: { __typename?: 'Photo', id?: string | null, liked?: boolean | null, likes?: number | null } | null };

export type LoginMutationVariables = Exact<{
  input: UserCredentials;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: string | null };

export type SignupMutationVariables = Exact<{
  input: UserCredentials;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: string | null };


export const GetFavsDocument = gql`
    query getFavs {
  favs {
    id
    categoryId
    src
    likes
    userId
  }
}
    `;

/**
 * __useGetFavsQuery__
 *
 * To run a query within a React component, call `useGetFavsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFavsQuery(baseOptions?: Apollo.QueryHookOptions<GetFavsQuery, GetFavsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFavsQuery, GetFavsQueryVariables>(GetFavsDocument, options);
      }
export function useGetFavsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFavsQuery, GetFavsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFavsQuery, GetFavsQueryVariables>(GetFavsDocument, options);
        }
export type GetFavsQueryHookResult = ReturnType<typeof useGetFavsQuery>;
export type GetFavsLazyQueryHookResult = ReturnType<typeof useGetFavsLazyQuery>;
export type GetFavsQueryResult = Apollo.QueryResult<GetFavsQuery, GetFavsQueryVariables>;
export const GetSinglePhotoDocument = gql`
    query getSinglePhoto($id: ID!) {
  photo(id: $id) {
    id
    categoryId
    src
    likes
    liked
    userId
  }
}
    `;

/**
 * __useGetSinglePhotoQuery__
 *
 * To run a query within a React component, call `useGetSinglePhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSinglePhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSinglePhotoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSinglePhotoQuery(baseOptions: Apollo.QueryHookOptions<GetSinglePhotoQuery, GetSinglePhotoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSinglePhotoQuery, GetSinglePhotoQueryVariables>(GetSinglePhotoDocument, options);
      }
export function useGetSinglePhotoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSinglePhotoQuery, GetSinglePhotoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSinglePhotoQuery, GetSinglePhotoQueryVariables>(GetSinglePhotoDocument, options);
        }
export type GetSinglePhotoQueryHookResult = ReturnType<typeof useGetSinglePhotoQuery>;
export type GetSinglePhotoLazyQueryHookResult = ReturnType<typeof useGetSinglePhotoLazyQuery>;
export type GetSinglePhotoQueryResult = Apollo.QueryResult<GetSinglePhotoQuery, GetSinglePhotoQueryVariables>;
export const LikePhotoDocument = gql`
    mutation likePhoto($input: LikePhoto!) {
  likePhoto(input: $input) {
    id
    liked
    likes
  }
}
    `;
export type LikePhotoMutationFn = Apollo.MutationFunction<LikePhotoMutation, LikePhotoMutationVariables>;

/**
 * __useLikePhotoMutation__
 *
 * To run a mutation, you first call `useLikePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePhotoMutation, { data, loading, error }] = useLikePhotoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLikePhotoMutation(baseOptions?: Apollo.MutationHookOptions<LikePhotoMutation, LikePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePhotoMutation, LikePhotoMutationVariables>(LikePhotoDocument, options);
      }
export type LikePhotoMutationHookResult = ReturnType<typeof useLikePhotoMutation>;
export type LikePhotoMutationResult = Apollo.MutationResult<LikePhotoMutation>;
export type LikePhotoMutationOptions = Apollo.BaseMutationOptions<LikePhotoMutation, LikePhotoMutationVariables>;
export const LoginDocument = gql`
    mutation login($input: UserCredentials!) {
  login(input: $input)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation signup($input: UserCredentials!) {
  signup(input: $input)
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;