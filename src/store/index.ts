import { createStore, applyMiddleware } from 'redux'
import reducers from './combine-reducers'
import thunk from 'redux-thunk'

export default createStore(reducers, applyMiddleware(thunk))
