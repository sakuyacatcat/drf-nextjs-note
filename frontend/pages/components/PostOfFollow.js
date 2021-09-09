import React, { useContext, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { ApiContext } from "../api/ApiContext";
import { ViewContext } from "./ViewState";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
    postCard: {
        color: '#f00',
        margin: '20px'
    },
    beLike: {
        color: '#cd7692'
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
}
));

const PostOfMe = () => {

    const classes = useStyles();

    const { allPosts, getAllPosts, followList, requestUser, toggleOnePostLike } = useContext(ApiContext);
    const { setViewMode } = useContext(ViewContext) || '';

    useEffect(() => {
        getAllPosts();
    }, [followList])

    const postsOfFollow = allPosts.filter((post) => {
        return followList.includes(post.user)
    }).sort(function (a, b) {
        if (a.created_at > b.created_at) {
            return -1
        }
        else if (a.created_at < b.created_at) {
            return 1
        }
    })


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


    return (
        <Grid container>
            <Grid item xs={12}>
                {postsOfFollow.map((post) =>
                    <div className={classes.postCard}>
                        <Card className={classes.root} variant="outlined">
                            <CardContent onClick={() => setViewMode(post.id)}>
                                <Typography className={classes.userInfo} color="textSecondary" gutterBottom>
                                    {post.username}
                                </Typography>
                                <Typography className={classes.postTitleInfo} variant="h6" component="h2">
                                    {post.title}
                                </Typography>
                                <Typography className={classes.postContentInfo} variant="body2" component="p">
                                    {post.content}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    {
                                        post.like.includes(requestUser.id) ?
                                            <FavoriteIcon
                                                onClick={(e) => toggleLike(e, post.id)}
                                                className={classes.beLike}
                                                role="button"
                                            /> :
                                            <FavoriteIcon
                                                onClick={(e) => toggleLike(e, post.id)}
                                                role="button"
                                            />
                                    }
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </Grid>
        </Grid>
    )
}

export default withCookies(PostOfMe)
