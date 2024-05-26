import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.$inputColor || '#4caf50'};
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1170px;
  align-items: center;
  margin-bottom: 30px;
`

const WrapperComponent = styled.div`
  width: 30%;
`
const CommentText = styled.div`
  width: 70%;
  font-style: italic;
  display: flex;
  text-align: left;
  padding: 20px;
 background-color: #679272;
 border-radius: 15px;
 font-size: 18px;
`

const InputText = styled.input`
    font-size: 18px;
    padding: 15px 20px;
    background-color: #679272;
    border-radius: 5px;
    border: none;
    border-bottom: 2px solid #fff;
    outline: none;
    width: 68%;
}
`

const Comment = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.comment.text);

    const inputRef = useRef(null);

    useEffect(() => {
        if(isEditing && inputRef.current){
            inputRef.current.focus();
        }
    }, [isEditing])

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        setIsEditing(false);
        props.onEdit(props.comment.id, editedText);
    }

    return (
        <CommentContainer>
            {
                isEditing ? (
                    <InputText
                        ref={inputRef}
                        type="text"
                        placeholder="Write some user comment"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                ) : (
                    <CommentText>{props.comment.text}</CommentText>
                )
            }
            <WrapperComponent>
                <StyledButton onClick={() => props.onLike(props.comment.id)}>Like ({props.comment.likes})</StyledButton>
                <StyledButton onClick={() => props.onDislike(props.comment.id)} $inputColor="#5b4ca1">Dislike</StyledButton>
                {isEditing ? (
                    <StyledButton onClick={handleSave} $inputColor="#59bba3">Save</StyledButton>
                ) : (
                    <StyledButton onClick={handleEdit} $inputColor="#396e7d">Edit</StyledButton>
                )
                }
            </WrapperComponent>
        </CommentContainer>
    )
}

export default Comment;