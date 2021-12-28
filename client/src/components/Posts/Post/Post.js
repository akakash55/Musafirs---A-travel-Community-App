import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { InstagramOutlined, MailTwoTone } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    // function r() { return Math.floor(Math.random() * 256) }
    // var color = 'rgb(' + r() + "," + r() + "," + r() + '0.5)';

    // function generateRandomColor() {
    //     var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    //     return randomColor;
    //     //random color will be freshly served
    // }

    return (
        <Card className={classes.card} >
            <CardMedia className={classes.media} title={post.places} style={{ backgroundColor: `${post.color}` }} />
            <div className={classes.overlay}>
                {(user?.result) && (
                    <Typography className={classes.topHeading} variant="h6">{post.name}</Typography>
                )}
                <Typography className={classes.topHeading} variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
            )}
            <div className={classes.details} >
                <Typography className={classes.topHeading} variant='body2' color="textSecondary" component="h2" style={{ textAlign: "center" }}>
                    From : {post.when}
                </Typography>
            </div>
            <div className={classes.details}>
                <Typography className={classes.topHeading} variant='body2' color="textSecondary" component="h2" style={{ textAlign: "center" }}>
                    No. of travellers : {post.persons}
                </Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2" style={{ textAlign: "center" }}>{post.places}
            </Typography>
            <CardContent>
                {(user?.result) && (
                    <>
                        <div className={classes.splitscreen}>
                            <div className={classes.left}>
                                <InstagramOutlined style={{ display: "inline-block" }} />
                                <Typography className={classes.typo} variant="body2" color="textSecondary" component="p" style={{ textAlign: "center", display: "inline-block" }}>{post.instaId}
                                </Typography>
                            </div>
                        </div>
                    </>
                )}
                {(user?.result) && (
                    <>
                        <div className={classes.splitscreen}>
                            <div className={classes.left}>
                                <MailTwoTone twoToneColor="#FF0000" style={{ display: "inline-block" }} />
                                <Typography className={classes.typo} variant="body2" color="textSecondary" component="p" style={{ textAlign: "center", display: "inline-block" }}>{user?.result?.email}
                                </Typography>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
            <CardActions className={classes.cardActions}>
                {(user?.result?._id === post?.creator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}
            </CardActions>
        </Card >
    );
};

export default Post;