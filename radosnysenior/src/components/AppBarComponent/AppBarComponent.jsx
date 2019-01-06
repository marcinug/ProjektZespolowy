import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
} from '@material-ui/core';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BookIcon from '@material-ui/icons/Book';
import CalendarToday from '@material-ui/icons/CalendarToday';
import MoreIcon from '@material-ui/icons/MoreVert';
import { styles } from './AppBarOwnStyles';
import './AppBarComponent.css';

class AppBarComponent extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: user.email });
      } else {
        this.props.history.push('/');
      }
    });
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  logOut = () => {
    let fb = this.props.firebase;
    fb.doSignOut();
    this.props.history.push('/');
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link
          to={`/users/${this.state.currentUser}`}
          className="reactRouterLink"
        >
          <MenuItem>Mój profil</MenuItem>
        </Link>
        <MenuItem onClick={this.logOut}>Wyloguj się</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <Link to="/events" className="reactRouterLink">
          <MenuItem>
            <IconButton color="inherit">
              <CalendarToday />
            </IconButton>
            <p>Wydarzenia</p>
          </MenuItem>
        </Link>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profil</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton> */}
            <Link to="/main" className="reactRouterLink">
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                RADOSNY SENIOR
              </Typography>
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link to="/add" className="reactRouterLink">
                <IconButton color="inherit">
                  <span className="addPostButton">+</span>
                </IconButton>
              </Link>
              <Link to="/events" className="reactRouterLink">
                <IconButton color="inherit">
                  <CalendarToday />
                </IconButton>
              </Link>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

const NavBar = compose(
  withFirebase,
  withRouter,
)(AppBarComponent);

export default withStyles(styles)(NavBar);
