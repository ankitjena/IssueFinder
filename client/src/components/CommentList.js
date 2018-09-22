import React from 'react';
import {Comment} from 'semantic-ui-react';

const CommentList = ({comment}) => {
  return (
    <Comment>
      <Comment.Content>
        <Comment.Author>{comment.author}</Comment.Author>
        <Comment.Text>
          <p>{comment.text}</p>
        </Comment.Text>
        <Comment.Metadata>{comment.time}</Comment.Metadata>
      </Comment.Content>
    </Comment>
  );
};

export default CommentList;
