import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  calculateCalories,
  changeBodyStats,
  setCalories,
} from './slice';

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

describe('reducer', () => {
  describe('changeBodyStats', () => {
    it('changes body stats', () => {
      const initialState = {
        bodyStats: {
          gender: '',
          age: 0,
          height: 0,
          weight: 0,
          activity: {
            level: 1,
            description: '운동 거의 안함',
          },
          goalNubmer: 0,
        },
      };

      const state = reducer(
        initialState,
        changeBodyStats({ name: 'age', value: '24' }),
      );

      expect(state.bodyStats.age).toBe('24');
    });
  });

  describe('setCalories', () => {
    it('changes a field of review', () => {
      const initialState = {
        calories: {
          bmr: 0,
          tdee: 0,
        },
      };

      const state = reducer(
        initialState,
        setCalories({ bmr: 123, tdee: 345 }),
      );

      expect(state.calories.bmr).toBe(123);
      expect(state.calories.tdee).toBe(345);
    });
  });
});

describe('actions', () => {
  let store;

  describe('calculateCalories', () => {
    beforeEach(() => {
      store = mockStore({
        bodyStats: {
          gender: 'male',
          age: 34,
          height: 180,
          weight: 75,
          activity: {
            level: 1,
            description: '운동 거의 안함',
          },
          goalNubmer: 0,
        },
      });
    });

    it('dispatchs setCalories', async () => {
      await store.dispatch(calculateCalories());

      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'application/setCalories',
        payload: { bmr: 1710, tdee: 2052 },
      });
    });
  });
});
