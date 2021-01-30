import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PostPagination() {
  const classes = useStyles();
  const list=["q", "w","e", "e","r", "t", "u", "ı", "o", "p", "q", "w","e", "e","r", "t", "u", "ı", "o", "p"]
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className={classes.root}>
      <Pagination count={10} shape="rounded" page={page} onChange={handleChange} />
    </div>
  );
}