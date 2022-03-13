export const dateTimePickerStyle = {
  '& .MuiInputBase-root': {
    font: '18px Montserrat',
    color: '#8395a7',

    backgroundColor: '#f9f9f9',

    fieldset: {
      border: '1px solid #ddd',
    },

    ':hover': {
      fieldset: {
        border: '1px solid #6d6d6d',
      },
    },

    '&.Mui-error': {
      fieldset: {
        border: '2px solid #ff0000',
      },
    },

    '&.Mui-focused': {
      fieldset: {
        border: '1px solid #ff9f43',
      },
    },
  },
};
