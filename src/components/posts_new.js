import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { createPost } from "../actions";
import { connect } from "react-redux";
class PostsNew extends Component {
  renderField(field) {
    const className = `form-group ${
      field.meta.touched && field.meta.error ? "has-error" : ""
    }`;
    return (
      <div className={className}>
        <label>{field.lable}</label>
        <input
          type="text"
          className="form-control"
          placeholder=""
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
    this.props.history.push("/");
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field lable="Title" name="title" component={this.renderField} />
          <Field
            lable="Categories "
            name="categories"
            component={this.renderField}
          />
          <Field
            lable="Post Content "
            name="post_content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/" className="btn btn-danger">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.post_content) {
    errors.post_content = "Post Content please";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(
  connect(
    null,
    { createPost }
  )(PostsNew)
);
