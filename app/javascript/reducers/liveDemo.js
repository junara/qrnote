import Note from '../models/Note'

export const CREATE_LIVE_DEMO = 'CREATE_LIVE_DEMO';

export const createLiveDemo = ({name, callback = null, flagDemo = true}) => {
  return {
    type: CREATE_LIVE_DEMO,
    payload: {name: name, callback: callback, flagDemo: flagDemo}
  }
};

export default (state = new Note(), action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
