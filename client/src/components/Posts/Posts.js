import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const [displayPost, setDisplayPost] = useState(posts);
    // console.log(displayPost);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        setDisplayPost(posts);
        const filteredData = posts.filter((item) => item.places.toLowerCase().includes(searchTerm));
        setDisplayPost(filteredData);
    }, [posts, searchTerm]);

    return (
        !displayPost.length ? <CircularProgress /> : (
            <>
                <div className={classes.searchpost}>
                    <TextField fullWidth label="Search by Place" variant="outlined" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
                </div>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {displayPost.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={user?.result ? 6 : 4}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            </>
        )
    );
};

export default Posts;