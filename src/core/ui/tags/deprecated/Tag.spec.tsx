/**
 * @jest-environment jsdom
 */
import { render } from '@/main/test/testUtils';
import { describe, test } from 'vitest';
import Tag from './Tag';

describe('Tag component', () => {
  test.skip('check Tag with message', async () => {
    // arrange
    const message = 'Tag message';

    // act
    render(<Tag text={message} />);

    // assert
    //toDo - extend toBeInTheDocument expect(screen.getByText(message)).toBeInTheDocument();
  });
});
