import React, {useState, useEffect} from 'react';
import {loadData, sendJson, assocPath, swap, loadJson} from '../utils';
import {useParams} from 'react-router-dom';
import {FileInput} from '../FileInput';
import {Link as RRLink} from 'react-router-dom';
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
import {LoadingPage} from './../LoadingPage';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

//icons
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CreateIcon from '@material-ui/icons/Create';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

//Flag imports
import HU from './../flags/HU.png';
import ENG from './../flags/ENG.png';
import SRB from './../flags/SRB.png';
import HR from './../flags/HR.png';

const flagSelect = language => {
  switch (language) {
    case 'HU':
      return HU;
    case 'HR':
      return HR;
    case 'ENG':
      return ENG;
    case 'SRB':
      return SRB;
  }
};

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
  titleFieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  titleField: {
    width: 300
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
  },
  flag: {
    height: 40
  },
  approvedPaper: {
    backgroundColor: '#00cc00',
    color: '#FFFFFF',
    width: 55,
    height: 24,
    borderRadius: 50,
    position: 'absolute',
    margin: 20,
    opacity: 0.4,
    textAlign: 'center'
  },
  notApprovedPaper: {
    backgroundColor: '#cc0000',
    color: '#FFFFFF',
    width: 55,
    height: 24,
    borderRadius: 50,
    position: 'absolute',
    margin: 20,
    opacity: 0.7,
    textAlign: 'center'
  },
  loadingModule: {
    position: 'fixed',
    height: 400,
    bottom: 200
  }
}));

export const Book = ({currentUser}) => {
  const [bookState, setBookState] = useState();
  const [pages, setPages] = useState([]);
  const [error, setError] = useState('');
  const [desTrigger, setDesTrigger] = useState(0);
  const [titleTrigger, setTitleTrigger] = useState(false);
  const [newTitle, setNewTitle] = useState('');
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

  //combine these two functions below into a single function that takes DATA as a param.

  const editPageDescription = async (des, id) => {
    const result = await sendJson('editPageDescription', {des, id});
    if (result.error) setError(result.error);
  };

  const editPageApproval = async id => {
    const result = await sendJson('editApproval', {id});
    if (result.error) setError(result.error);
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
            <Container maxWidth="md">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {bookState.title}
                <Collapse in={currentUser.admin}>
                  <Collapse in={!titleTrigger}>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      className="btn btn-info btn-sm"
                      onClick={() => {
                        setTitleTrigger(!titleTrigger);
                      }}
                    >
                      CHANGE TITLE
                      <CreateIcon />
                    </Button>
                  </Collapse>
                </Collapse>
              </Typography>

              <Collapse in={titleTrigger}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    changeTitle(newTitle);
                    setTitleTrigger(!titleTrigger);
                  }}
                >
                  <div className={classes.titleFieldContainer}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      className={classes.titleField}
                      id="newTitle"
                      label="New Title"
                      onChange={e => setNewTitle(e.target.value)}
                    />

                    <Button type="submit" color="primary">
                      Save Title{' '}
                    </Button>
                  </div>
                </form>
              </Collapse>

              {/* BELOW IS THE SECOND SET OF THINGS UNRELATED TO TITLE */}

              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                By: {bookState.author}
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
                      {'   '}
                      <img
                        src={flagSelect(bookState.language)}
                        alt={bookState.language}
                        className={classes.flag}
                      />
                    </Typography>
                  </Grid>
                </Grid>

                {bookState.origin_id && (
                  <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                  >
                    <RRLink to={'/book/' + bookState.origin_id}>
                      Click here for origin (id: {bookState.origin_id})
                    </RRLink>
                  </Typography>
                )}

                <Grid container spacing={2} justify="center">
                  {currentUser ? (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={
                        (window.location.host == 'localhost:3000'
                          ? 'http://localhost:8081'
                          : '') +
                        '/print/' +
                        bookId
                      }
                    >
                      <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        className="btn  btn-sm"
                      >
                        <PrintIcon /> Print PDF
                      </Button>
                    </a>
                  ) : (
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      disabled={true}
                      className="btn  btn-sm"
                    >
                      <PrintIcon /> Please log in to print PDFs
                    </Button>
                  )}
                  <Grid item></Grid>
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
            {pages.map(
              (
                {
                  id,
                  page_image,
                  page_description,
                  origin_description,
                  approved
                },
                i
              ) => (
                <Grid item key={id} xs={6}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={page_image ? page_image : placeHolderImage}
                      title={'Page Number: ' + (i + 1) + '.'}
                    />

                    {approved ? (
                      <Paper className={classes.approvedPaper}>
                        <CheckIcon />
                      </Paper>
                    ) : (
                      <Paper className={classes.notApprovedPaper}>
                        <ClearIcon />
                      </Paper>
                    )}

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
                    {currentUser.admin && (
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
                          disabled={
                            currentUser.id !== bookState.author_id
                              ? false
                              : true
                          }
                          size="large"
                          color="secondary"
                          onClick={() => {
                            setPages(
                              assocPath([i, 'approved'], !approved, pages)
                            );
                            editPageApproval(id);
                          }}
                        >
                          {approved ? <ClearIcon /> : <CheckIcon />}
                        </Button>
                      </CardActions>
                    )}
                    <CardContent className={classes.cardContent}>
                      <Typography>
                        {origin_description
                          ? 'Translate from: ' + origin_description
                          : 'Original'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </Container>
      ) : (
        <LoadingPage />
      )}
    </React.Fragment>
  );
};
