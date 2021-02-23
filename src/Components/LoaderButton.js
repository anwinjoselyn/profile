import React from "react";
import { Button, Spinner } from "react-bootstrap";
//import { Glyphicon } from "react-bootstrap/Glyphicon";
import "./LoaderButton.css";

const LoaderButton = ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) => (
  <Button
    variant="secondary"
    size="lg"
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && (
      <Spinner
        as="span"
        animation="grow"
        size="lg"
        role="status"
        aria-hidden="true"
      />
    )}
    {!isLoading ? text : loadingText}
  </Button>
);

export default LoaderButton;
