// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { ArticleStore, State as ArticleState, store as article } from '@/store/modules/article';
// eslint-disable-next-line import/no-cycle
import { SharedStore, State as SharedState, store as shared } from '@/store/modules/shared';
import { createLogger, createStore } from 'vuex';

export type RootState = {
  shared: SharedState;
  article: ArticleState;
};

export type Store = SharedStore<
  Pick<RootState, 'shared'>> &
  ArticleStore<Pick<RootState, 'article'>
 >;

// Plug in logger when in development environment
const isDebugMode = process.env.NODE_ENV !== 'production';
const plugins = isDebugMode ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    shared,
    article,
  },
});

export function useStore(): Store {
  return store as Store;
}
