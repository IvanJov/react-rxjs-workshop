import 'rxjs';
import { combineEpics } from 'redux-observable';
import { INCREASE, DECREASE, INCREASE_STORE, DECREASE_STORE, FETCH_USER } from './constants';
import { fetchUserSuccess, fetchUserFailed } from './actions';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';

export const increaseNumber = actions$ =>
  actions$
    .ofType(INCREASE)
    .delay(2000)
    .mapTo({ type: INCREASE_STORE });

export const decreaseNumber = actions$ =>
  actions$
    .ofType(DECREASE)
    .delay(2000)
    .mapTo({ type: DECREASE_STORE });

export const fetchUser = actions$ =>
  actions$
    .ofType(FETCH_USER)
    .filter(action => action.payload.username.length < 14)
    .mergeMap(action =>
      ajax.getJSON(`https://api.github.com/users/${action.payload.username}`)
        .map(user => fetchUserSuccess(user))
        .takeUntil(actions$.ofType(FETCH_USER))
        .catch(error => Observable.of(fetchUserFailed()))
    );


export default combineEpics(
  increaseNumber,
  decreaseNumber,
  fetchUser
)