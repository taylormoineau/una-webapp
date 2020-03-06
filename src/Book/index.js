import React, {useState, useEffect} from 'react';
import {loadData, sendJson, assocPath, swap} from '../utils';
import {useParams} from 'react-router-dom';
import {FileInput} from '../FileInput';
import {CreatePage} from './CreatePage';
import {EditTitle} from './EditTitle';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import placeHolderImage from './placeHolderImage.png';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

//icons
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CreateIcon from '@material-ui/icons/Create';
import PrintIcon from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const styles = {
  overlay: {
    position: 'relative',
    top: '30px',
    left: '30px',
    width: 30,
    height: 45
  }
};

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    height: 500
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export const Book = () => {
  const [bookState, setBookState] = useState();
  const [pages, setPages] = useState([]);
  const [error, setError] = useState('');
  const [desTrigger, setDesTrigger] = useState(0);
  const {bookId} = useParams();
  const classes = useStyles();

  const changeTitle = async newTitle => {
    const result = await sendJson('editBook/' + bookId, {newTitle});
    if (result.error) setError(result.error);
    await loadData('getOneBook/' + bookId, setBookState, setError);
  };

  const editPageOrder = async (index, dir) => {
    const newPages = pages.slice();
    swap(newPages, index, dir);
    setPages(newPages);
    const result = await sendJson(
      'editPageNumber',
      newPages.map(p => p.id)
    );
    if (result.error) setError(result.error);
  };

  const editPageDescription = async (des, id) => {
    const result = await sendJson('editPageDescription', {des, id});
    if (result.error) setError(result.error);
  };

  const createNewPage = async pageDes => {
    const result = await sendJson('createPageInBook/' + bookId, {pageDes});
    if (result.error) setError(result.error);
    await loadData('getPagesForBook/' + bookId, setPages, setError);
  };

  const deletePage = async id => {
    if (
      !window.confirm(
        'Are you sure you want to delete this page? Deleted pages cannot be restored!'
      )
    )
      return;

    await sendJson('deletePage', {id});
    //This can only be changed by administrators, so only server errors should be a problem here.
    await loadData('getPagesForBook/' + bookId, setPages, setError);
  };

  const updateImage = async (data, id) => {
    const result = await sendJson('updateImage', {img: data, id});
    if (result.error) setError(result.error);
  };

  useEffect(() => {
    loadData('getOneBook/' + bookId, setBookState, setError);
    loadData('getPagesForBook/' + bookId, setPages, setError);
  }, [bookId]);

  return (
    <React.Fragment>
      <CssBaseline />
      {/* INSTRUCTIONS/PRINT*/}
      {bookState && (
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {bookState.title}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                By: {bookState.created_by_user}
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={3} justify="center">
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      Book id: {bookId}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      Language: {bookState.language}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      <PrintIcon /> Print Preview
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>
      )}

      {/* PAGES */}
      {bookState ? (
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End INSTRUCTION */}
          <Grid container spacing={4}>
            {pages.map(({id, page_image, page_description}, i) => (
              <Grid item key={id} xs={6}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={page_image ? page_image : placeHolderImage}
                    title={'Page Number: ' + (i + 1) + '.'}
                  />
                  <CardContent className={classes.cardContent}>
                    {desTrigger === id ? (
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          page_description &&
                            editPageDescription(page_description, id);
                          setDesTrigger(0);
                        }}
                      >
                        <TextField
                          id="outlined-multiline-static"
                          label="Page Text"
                          multiline
                          rows="3"
                          defaultValue={page_description}
                          variant="outlined"
                          onChange={e =>
                            setPages(
                              assocPath(
                                [i, 'page_description'],
                                e.target.value,
                                pages
                              )
                            )
                          }
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          style={styles.overlay}
                        >
                          <SaveIcon />
                        </Button>
                      </form>
                    ) : (
                      <Typography>
                        {'Page ' + (i + 1) + ' : ' + page_description}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      size="large"
                      color="primary"
                      onClick={() => setDesTrigger(id)}
                    >
                      <CreateIcon />
                    </Button>

                    {i < pages.length - 1 && (
                      <Button
                        size="large"
                        color="primary"
                        className="btn btn-info btn-sm"
                        onClick={() => editPageOrder(i, 'down')}
                      >
                        <ArrowDownwardIcon />
                      </Button>
                    )}

                    {i > 0 && (
                      <Button
                        size="large"
                        color="primary"
                        onClick={() => editPageOrder(i, 'up')}
                      >
                        <ArrowUpwardIcon />
                      </Button>
                    )}

                    <FileInput
                      onChange={data => {
                        setPages(assocPath([i, 'page_image'], data, pages));
                        updateImage(data, id);
                      }}
                    />
                    <Button
                      size="large"
                      color="secondary"
                      onClick={() => deletePage(id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Loading Book.....
          </Typography>
        </Container>
      )}
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      <CreatePage onCreateNewPage={createNewPage} />
      {/* End footer */}
    </React.Fragment>
    // <div className="container">

    //   <h3 style={{color: 'red'}}>{error}</h3>
    //   <div className="container">
    //     {bookState ? (
    //       <div key={bookId}>
    //         <h1>Unique id:</h1>
    //         <h2>{bookId}</h2>
    //         <h1>Title:</h1>
    //         <h2>{bookState.title}</h2>
    //         <EditTitle onChangeTitle={changeTitle} />
    //         <h1>Author:</h1>
    //         <h2>{bookState.created_by_user}</h2>
    //         <h1>Created_date:</h1>
    //         <h2>{bookState.created_date}</h2>
    //         <h1>Last Edited by:</h1>
    //         <h2>{bookState.edited_by_user}</h2>
    //         <h1>Last Edited_date:</h1>
    //         <h2>{bookState.edited_date}</h2>
    //       </div>
    //     ) : (
    //       <h1>LOADING BOOK</h1>
    //     )}
    //     {pages.map(({id, page_image, page_description, page_number}, i) => (
    //       <div key={id}>

    //         )}

    //         ) : (
    //           <p>{'Page ' + (page_number + 1) + ' : ' + page_description}</p>
    //         )}
    //         <button
    //           className="btn btn-warning btn-sm"
    //           onClick={() => setDesTrigger(id)}
    //         >
    //           Edit Description
    //         </button>
    //         <FileInput
    //           className="btn btn-info btn-sm"
    //           onChange={data =>
    //             setPages(
    //               assocPath([i, 'page_image'], data, pages),
    //               updateImage(data, id)
    //             )
    //           }
    //         />
    //         <button
    //           className="btn btn-danger btn-sm"
    //           onClick={() => deletePage(id)}
    //         >
    //           Delete Page
    //         </button>

    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};
