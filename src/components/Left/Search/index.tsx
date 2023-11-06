import Modal from '@components/common/Modal';
import SearchWindow from './window';

const Search = () => {
  return (
    <Modal position="top" window={<SearchWindow />}>
      검색
    </Modal>
  );
};

export default Search;
