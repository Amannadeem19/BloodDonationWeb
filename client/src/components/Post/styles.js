import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
     margin: 8,
    },
  },
  paper: {
    padding: 16,
    // height: '550px',
    // width: '40%',
    
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
 
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor:'rgba(123,181,255, 1)'
   
  },
  buttonClear: {
    marginBottom: 10,
    backgroundColor:'Red'
   
  },
  // show requests

  mainContainer: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: '5px',
  },
  purple: {
    // color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  // [theme.breakpoints.down('sm')]: {
  //   appBar: {
  //     padding: '10px 20px',
  //   },
  //   heading: {
  //     display: 'none',
  //   },
  //   userName: {
  //     display: 'none',
  //   },
  //   image: {
  //     marginLeft: '5px',
  //   },
  //   toolbar: {
  //     display: 'flex',
  //     justifyContent: 'flex-end',
  //     width: '160px',
  //   },
  // },
  actionDiv: {
    textAlign: 'center',
  },
  media: {
    height: 0,
    paddingTop: '70.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
}));