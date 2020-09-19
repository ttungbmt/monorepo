import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers'
import { reduxBatch } from '@manaflair/redux-batch'

function configureAppStore(preloadedState) {
  const middleware = [...getDefaultMiddleware()]

  const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [reduxBatch]
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      const newRootReducer = require('./reducers').default
      store.replaceReducer(newRootReducer)
    })
  }

  return store
}

export default configureAppStore()
