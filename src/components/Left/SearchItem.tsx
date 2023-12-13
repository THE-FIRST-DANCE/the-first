import styled from 'styled-components';
import { SearchType } from '@interfaces/search.interface';
import { Place } from '@interfaces/place.interface';
import { Tag } from '@interfaces/tag.interface';
import { User } from '@interfaces/user.interface';
import UserAvatar from '@components/common/UserAvatar';

interface SearchItemProps {
  data: Partial<User & Tag & Place>;
  type?: SearchType;
  callback?: () => void;
}

const SearchItem = (props: SearchItemProps) => {
  const { data, type } = props;

  return (
    <Container onClick={props.callback}>
      {type === 'user' ? (
        <div>
          <div className="visualization">
            <UserAvatar
              username={data.username || ''}
              src={data.avatar}
              size={44}
            />
          </div>

          <div className="content">
            <span className="pri">{data.username}</span>
            <span className="sub">{data.name}</span>
          </div>
        </div>
      ) : type === 'tag' ? (
        <div>
          <div className="visualization">
            <div className="tag">#</div>
          </div>

          <div className="content">
            <span className="pri">{data.name}</span>
            <span className="sub"></span>
          </div>
        </div>
      ) : type === 'place' ? (
        <div>
          <div className="visualization">
            <div className="place">here</div>
          </div>

          <div className="content">
            <span className="pri">{data.name}</span>
            <span className="sub">{data.address}</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default SearchItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 24px;

  &:hover {
    backdrop-filter: brightness(0.98);
  }

  & > div {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  & div.visualization {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    border: ${({ theme }) => theme.lightTheme.borderColor};
    flex-shrink: 0;
    margin: 5px 7px 5px 5px;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    & > div.tag {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    & > div.place {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }

  & div.content {
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    flex-grow: 1;
    row-gap: 0.25rem;
    & > span.pri {
      font-weight: bold;
    }

    & > span.sub {
    }
  }
`;
