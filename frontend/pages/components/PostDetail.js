import React, { useContext, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { ApiContext } from "../api/ApiContext";
import { ViewContext } from "./ViewState";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { withCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
    postCard: {
        color: '#f00',
        margin: '20px'
    },
    beLike: {
        color: '#cd7692'
    },
    beFollow: {
        color: '#4ba1da',
    },
    userInfo: {
        margin: '10px 0 10px 0'
    },
    postTitleInfo: {
        margin: '10px 0 10px 0'
    },
    postContentInfo: {
        margin: '10px 0 0 0'
    },
}));

const PostDetail = (props) => {

    const classes = useStyles();

    const { getOnePost, onePost, getOnePostLikeList, onePostLikeList, requestUser, toggleOnePostLike, followList, toggleOneUserFollow } = useContext(ApiContext);
    const { viewMode } = useContext(ViewContext) || '';

    useEffect(() => {
        getOnePost(viewMode);
        getOnePostLikeList(viewMode);
    }, [followList])

    const toggleLike = (event, postId) => {

        const evt_classes = event.currentTarget.classList
        const beLikeClass = classes.beLike

        if (evt_classes.contains(beLikeClass)) {
            event.currentTarget.classList.remove(beLikeClass);
        }
        else {
            event.currentTarget.classList.add(beLikeClass);
        }

        toggleOnePostLike(postId);
    };

    const toggleFollow = (event, postId) => {

        const evt_classes = event.currentTarget.classList
        const beFollowClass = classes.beFollow

        if (evt_classes.contains(beFollowClass)) {
            event.currentTarget.classList.remove(beFollowClass);
        }
        else {
            event.currentTarget.classList.add(beFollowClass);
        }

        toggleOneUserFollow(postId);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <div className={classes.postCard}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            {
                                onePost.user === requestUser.id ?
                                    <Typography variant="body2" component="p" color="textSecondary">
                                        あなたの投稿
                                    </Typography>
                                    :
                                    <Typography variant="h6" component="p">
                                        {
                                            followList.includes(onePost.user) ?
                                                <PersonAddIcon
                                                    onClick={(e) => toggleFollow(e, onePost.id)}
                                                    className={classes.beFollow}
                                                    role="button"
                                                /> :
                                                <PersonAddIcon
                                                    onClick={(e) => toggleFollow(e, onePost.id)}
                                                    role="button"
                                                />
                                        }
                                    </Typography>
                            }
                            <Typography className={classes.userInfo} variant="h6" color="textSecondary" gutterBottom>
                                {onePost.username}
                            </Typography>
                            <Typography className={classes.postTitleInfo} variant="h6" component="h2">
                                {onePost.title}
                            </Typography>
                            <Typography className={classes.postContentInfo} variant="body2" component="p">
                                {onePost.content}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="body2" component="p">
                                {
                                    onePostLikeList.includes(requestUser.id) ?
                                        <FavoriteIcon
                                            onClick={(e) => toggleLike(e, onePost.id)}
                                            className={classes.beLike}
                                            role="button"
                                        /> :
                                        <FavoriteIcon
                                            onClick={(e) => toggleLike(e, onePost.id)}
                                            role="button"
                                        />
                                }
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
        </Grid>
    )
}

export default withCookies(PostDetail)
