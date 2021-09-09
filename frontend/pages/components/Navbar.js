import React, { useState, useContext } from "react";
import { ApiContext } from "../api/ApiContext";
import { ViewContext } from "./ViewState";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withCookies } from "react-cookie";
import { Modal, Form, Button } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    color: "#fff",
  },
  breadcrumb: {
    flexGrow: 1,
    color: "#fff"
  },
  menu: {
    '&:hover': {
      cursor: 'pointer'
    },
  },
  icon: {
    flexGrow: 1,
    '&:hover': {
      cursor: 'pointer'
    },
  }
}));

const Navbar = (props) => {

  const classes = useStyles();
  const { requestUser, createNewPost } = useContext(ApiContext);
  const { setViewMode } = useContext(ViewContext) || '';
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const token = props.cookies.get("current-token");

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setFormTitle('');
    setFormContent('');
  };

  const handleSubmit = (event, title, content) => {
    event.preventDefault();
    createNewPost(title, content, requestUser.id);
  };

  const Logout = () => (event) => {
    props.cookies.remove("current-token");
    window.location.href = "/";
  };

  return (
    <AppBar position="static">

      {
        typeof token === 'undefined' ?
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              SNSapp
            </Typography>
          </Toolbar>
          :
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              SNSapp
            </Typography>

            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
              <Typography onClick={() => setViewMode('allUser')} variant="h5" className={classes.menu}>
                AllUser
              </Typography>
              <Typography onClick={() => setViewMode('followUser')} variant="h5" className={classes.menu}>
                FollowUser
              </Typography>
              <Typography onClick={() => setViewMode('mine')} variant="h5" className={classes.menu}>
                {requestUser.username}
              </Typography>
              <Typography onClick={openModal} variant="h5" className={classes.menu}>
                MakePost
              </Typography>
            </Breadcrumbs>

            <Typography variant="h4">
              <ExitToAppIcon onClick={Logout()} className={classes.icon} />
            </Typography>
          </Toolbar>
      }

      <Modal size='lg' show={modalIsOpen} onHide={() => closeModal()}>
        <Modal.Header>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handleSubmit(e, formTitle, formContent)}>
          <Modal.Body>
            <Form.Group controlId="titleInput">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="タイトルを入力" />
            </Form.Group>
            <Form.Group controlId="contentInput">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" name="content" value={formContent} onChange={(e) => setFormContent(e.target.value)} placeholder="本文を入力" as="textarea" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">Submit</Button>
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div style={{ display: 'none' }}>
        <form name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="newPost" />
          <input type="text" name="formtitle" defaultValue={formTitle} />
          <input type="text" name="formcontent" defaultValue={formContent} />
        </form>
      </div>
    </AppBar>
  );
};

export default withCookies(Navbar);
