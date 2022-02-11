import * as React from "react";
import { Form } from "react-final-form";
import { Box, Button } from "@material-ui/core";
import { DateInput, SelectInput } from "react-admin";

export interface MapFilters {
  type?: string;
  on?: string;
  at?: string;
}

export const PostFilterForm = ({
  setFilters,
}: {
  setFilters: (filters?: MapFilters) => void;
}) => {
  return (
    <Form onSubmit={setFilters} initialValues={{}}>
      {({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
            mb={1}
          >
            <Box component="span" mr={2}>
              <SelectInput
                source="type"
                choices={[
                  { id: "all", name: "All" },
                  { id: "dropped", name: "Dropped" },
                  { id: "picked_up", name: "Picked up" },
                ]}
              />
            </Box>
            <Box component="span" mr={2}>
              <SelectInput
                source="on"
                choices={[
                  { id: "today", name: "Today" },
                  { id: "week", name: "This week" },
                  { id: "month", name: "Last 30 days" },
                ]}
              />
            </Box>
            <Box component="span" mr={2} mb={4}>
              OR
            </Box>
            <Box component="span" mr={2}>
              <DateInput source="at" />
            </Box>

            <Box component="span" mr={2} mb={4}>
              <Button variant="outlined" color="primary" type="submit">
                Filter
              </Button>
            </Box>
            <Box component="span" mb={4}>
              <Button
                variant="outlined"
                onClick={() => {
                  form.reset();
                  setFilters(undefined);
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Form>
  );
};
