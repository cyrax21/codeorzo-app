{
    

    // TODO Add the this scipt into home.ejs to enable ajax. right now its not working properly
    // !SSUE : req of ajax/xhr request for deleting is not working properly
    //     <!-- importing this script for creating the comments -->
    // <script src="/js/home_post_comments.js" ></script>
    // <script src="/js/home_posts.js"></script>
    
    
    
    
    
    // Method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form'); //getting the form

        // e is for the event
        newPostForm.submit(function(e){
            // Prevent default submission
            e.preventDefault();

            // Manually submit it 
            $.ajax({
                type: 'post', // type of request
                url: '/posts/create',  // At which Router
                data: newPostForm.serialize(), //This convert the post form data into JSON
                
                // if successfully posted else error
                success: function(data){
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-show').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'semanticui',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            }); 
        });
    }

    // Method to create a post in DOM
    let newPostDOM = function(post){
        return $(`<li id="post-${ post._id } ">
                    <div class="post-style">
                        <div class="content-stylings">
                            <div>
                                <h3>${ post.user.name }</h3>
                                <h6><span class="dot"></span>${ post.createdAt }</h6>
                            </div>
                            <p>${ post.content }</p>

                                <small>
                                    <a class="delete-post-button" href="/posts/destroy/${ post._id}">
                                        <i class="far fa-trash-alt"></i>
                                    </a>
                                </small>

                        </div>
                        <div class="comment-section">
                                <div class="comment-create-style">
                                    <form action="/comments/create" method="POST">
                                        <input type="text" name="content" placeholder="Type comment here ... " required>
                                        <!-- it will send the post id as a attribute-->
                                        <input type="hidden" name="post" value="${ post._id }"> 
                                        <button type="submit">Add Comment</button>
                                    </form>
                                </div>
                            <div class="comments-style">
                                <ul id="post-comments-${ post._id }">

                                </ul>
                            </div>
                        </div>
                    </div>
                </li>`)
    }

    // Method to delete a post from DOM using ajax
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'semanticui',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }


    createPost();
    convertPostsToAjax();
}