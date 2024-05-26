import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from './Comment';
import styled from 'styled-components';

const apiURL = 'https://66532373813d78e6d6d753a4.mockapi.io/api/comments/comments';

const ContainerWrapper = styled.div`
    max-width: 1170px;
    margin: auto;
`

const CommentsList = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(apiURL)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the comments!", error);
            });
    }, []);

    const handleLike = (id) => {
        const updatedComments = comments.map(comment =>
            comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
        );
        setComments(updatedComments);
    };

    const handleUnlike = (id) => {
        const updatedComments = comments.map(comment =>
            comment.id === id ? { ...comment, likes: Math.max(comment.likes - 1, 0) } : comment
        );
        setComments(updatedComments);
    };

    const handleEdit = (id, text) => {
        const updatedComments = comments.map(comment =>
            comment.id === id ? { ...comment, text } : comment
        );
        setComments(updatedComments);
    };



    return (
        <ContainerWrapper>
            {!(comments.length > 0) ?
                <p>Loading...</p> :
                comments.map(comment => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onLike={handleLike}
                        onDislike={handleUnlike}
                        onEdit={handleEdit}
                    />
                ))}
        </ContainerWrapper>
    );
};

export default CommentsList;