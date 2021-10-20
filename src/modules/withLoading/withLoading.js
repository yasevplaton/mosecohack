import React from "react";
import styles from "./loading.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

export const withLoading = (WrappedComp) => {
  return (props) => {
    const { status, ...rest } = props;
    if (status === "loading") {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>
            <CircularProgress color="secondary" />
          </div>
        </div>
      );
    }
    if (status === "error") {
      return <div>Произошла ошибка</div>;
    }
    if (status === "success") {
      return <WrappedComp {...rest} />;
    }
    return null;
  };
};
