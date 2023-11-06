import Modal from '@components/common/Modal';
import PostWindow from './window';

const Post = () => {
  return (
    <Modal position="center" window={<PostWindow />}>
      포스트
    </Modal>
  );
};

export default Post;
