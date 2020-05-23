export const reducer = (state, action) => {
  switch (action.type) {
    case "update_state":
      if (state.publicKey === action.data.publicKey) {
        return { ...state, state: action.data.state };
      }
      return state;

    case "check_room_response":
      return {
        ...state,
        roomStatus: {
          shortCode: action.shortCode,
          publicKey: action.publicKey,
        },
      };

    case "create_room_response":
      return {
        ...state,
        state: action.response.state,
        publicKey: action.response.publicKey,
        shortCode: action.response.shortCode,
      };

    case "join_room_response":
      return {
        ...state,
        loading: false,
        state: action.response.state,
        publicKey: action.response.publicKey,
        shortCode: state.roomStatus.shortCode,
      };

    default:
      return state;
  }
};

export const initReducer = ({ urlFragment }) => {
  const state = {
    loading: false,
    state: null,
    publicKey: null,
    privateKey: null,
    shortCode: null,
    roomStatus: {
      shortCode: null,
      publicKey: null,
    },
  };

  if (urlFragment[0] === "room" && urlFragment[1]) {
    state.loading = urlFragment[1];
  }

  return state;
};
