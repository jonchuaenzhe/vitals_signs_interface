import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHttpClient } from "../hooks/http-hook";
import { Breadcrumb, Layout } from "antd";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  post: {
    marginRight: theme.spacing(2),
  },
  back: {
    marginLeft: theme.spacing(2),
  },
}));

const { Content } = Layout;

const DataForm = () => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const { sendRequest } = useHttpClient();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const postData = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_DEV_URL}/data/`,
        "POST",
        value,
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
      setValue("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Form</Breadcrumb.Item>
        </Breadcrumb>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "80vh" }}
        >
          <Grid item xs={12}>
            <h4>{"Data should be in the following format:"}</h4>
          </Grid>
          <Grid>
            <h5>
              {"{"} <br /> {'"sample_no": Number, '} <br />
              {'"timestamp"(optional): Date, '} <br />
              {'"ecg_data": Array'}
              <br /> {"}"}
            </h5>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField
                variant="outlined"
                multiline
                value={value}
                onChange={handleChange}
                rows={4}
                label="Enter json data"
              />
            </form>
          </Grid>
          <Grid item xs={3}>
            <Button
              className={classes.post}
              variant="contained"
              color="secondary"
              onClick={postData}
            >
              Post
            </Button>
            <Button
              className={classes.back}
              variant="contained"
              color="primary"
              href="/"
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Content>
    </Layout>
  );
};

export default DataForm;
