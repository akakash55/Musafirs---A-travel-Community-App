import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const initialState = { places: '', when: '', persons: '', instaId: '' };

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState(initialState);
    const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id === currentId) : null)); //edit post pe jab click karenge toh yeh wo post laake dega 
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]); // jasehi edit button pe click karenge yeh wala function trigger hoga aur form mein data prefill hoke aa jaayega

    const clear = () => {
        setCurrentId(0);
        setPostData(initialState);
    };

    function generateRandomColor() {
        var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return randomColor;
        //random color will be freshly served
    }

    // function r() { return Math.floor(Math.random() * 256) }
    // var color = 'rgb(' + r() + "," + r() + "," + r() + '0.5)';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name, color: generateRandomColor() }));  // postdata mein user jo post create kiya hai wo bhi add kar kar rahe hain
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    };
    
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography className={classes.info} variant="h6" align="center">
                    Please Sign In to create your own travel post or contact others.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography className={classes.info} variant="h6">
                    {currentId ? `Editing the Travel Post"` : 'Create a Travel Post'}
                </Typography>

                <TextField  name="places" variant="outlined" label="Place you are planning to visit" fullWidth value={postData.places} onChange={(e) => setPostData({ ...postData, places: e.target.value })} />

                <TextField name="when" variant="outlined" label="When are you planning to visit?" fullWidth value={postData.when} onChange={(e) => setPostData({ ...postData, when: e.target.value })} />

                <TextField name="persons" variant="outlined" label="How many people are planning to travel?" fullWidth value={postData.persons} onChange={(e) => setPostData({ ...postData, persons: e.target.value })} />

                <TextField name="instaId" variant="outlined" label="Your InstaId" fullWidth value={postData.instaId} onChange={(e) => setPostData({ ...postData, instaId: e.target.value })} />

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;