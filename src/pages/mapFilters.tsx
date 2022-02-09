import * as React from "react";
import { Form } from "react-final-form";
import { Box, Button, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { TextInput, NullableBooleanInput } from "react-admin";

export const PostFilterForm = () => {
  const onSubmit = (values: any) => {
    if (Object.keys(values).length > 0) {
      // setFilters(values);
    } else {
      //hideFilter("main");
    }
  };

  const resetFilter = () => {
    //setFilters({}, []);
  };

  return (
    <Form onSubmit={onSubmit} initialValues={{}}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
            mb={1}
          >
            <Box component="span" mr={2}>
              {/* Full-text search filter. We don't use <SearchFilter> to force a large form input */}
              <TextInput
                resettable
                helperText={false}
                source="q"
                label="Search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box component="span" mr={2}>
              <NullableBooleanInput helperText={false} source="commentable" />
            </Box>
            <Box component="span" mr={2} mb={1.5}>
              <Button variant="outlined" color="primary" type="submit">
                Filter
              </Button>
            </Box>
            <Box component="span" mb={1.5}>
              <Button variant="outlined" onClick={resetFilter}>
                Reset
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Form>
  );
};
