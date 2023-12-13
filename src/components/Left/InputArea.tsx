import styled from 'styled-components';
import useToggle from '@hooks/useToggle';
import EmojiIcon from '@assets/icons/emoji';

interface InputAreaProps {
  textHandler: {
    input: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    add: (emoji: string) => void;
  };
  text: string;
}

const InputArea = (props: InputAreaProps) => {
  return (
    <div>
      <Textarea
        value={props.text}
        autoFocus
        rows={6}
        onChange={props.textHandler.input}
      />
      <EmojiInputDropdown addHandler={props.textHandler.add} />
    </div>
  );
};

export default InputArea;

interface EmojiInputProps {
  addHandler: (emoji: string) => void;
}

const EmojiInputDropdown = (props: EmojiInputProps) => {
  const toggler = useToggle();

  const emojis = ['😀', '😃', '😄', '😁', '😆', '❤️', '✨', '🎉', '💯', '🔥'];

  return (
    <EmojiInputContainer>
      <button onClick={toggler.toggle}>
        <EmojiIcon />
      </button>
      {toggler.isOpen && (
        <EmojiContainer>
          <BalloonContainer>
            {emojis.map((emoji, i) => (
              <Emoji key={i} onClick={() => props.addHandler(emoji)}>
                {emoji}
              </Emoji>
            ))}
          </BalloonContainer>
        </EmojiContainer>
      )}
    </EmojiInputContainer>
  );
};

const EmojiInputContainer = styled.div`
  position: relative;
  padding: 8px;
`;

const EmojiContainer = styled.div`
  position: absolute;
`;

const BalloonContainer = styled.div`
  display: grid;
  position: relative;
  flex-wrap: wrap;
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px;
  margin-top: 8px;
  grid-template-columns: repeat(5, 1fr);

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    width: 32px;
    height: 21px;
    clip-path: path(
      'M8 0C8 4 9.32406e-08 7.819 1.25211e-07 10.5C1.57188e-07 13.1815 8 17.0005 8 21L8 0Z'
    );
    background-color: black;
    transform: rotate(90deg);
  }
`;

const Textarea = styled.textarea`
  font-size: 18px;
  background-color: ${({ theme }) => theme.lightTheme.bgColor};
  resize: none;
  color: black;
  border: none;
  outline: none;
  width: 225px;
  font-family: var(--font-family-system);
`;

const Emoji = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  padding: 0.5rem;
  /* cursor: pointer; */
`;
