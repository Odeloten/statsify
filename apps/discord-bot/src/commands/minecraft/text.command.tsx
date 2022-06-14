import { NumberArgument, TextArgument } from '#arguments';
import { Command, CommandContext, IMessage } from '@statsify/discord';
import { render } from '@statsify/rendering';

@Command({
  description: (t) => t('commands.text'),
  args: [new TextArgument('content'), new NumberArgument('size', 1, 9)],
})
export class TextCommand {
  public async run(context: CommandContext): Promise<IMessage> {
    const content = context.option<string>('content').trim();
    const size = Math.min(context.option<number>('size', 2), 9);

    const text = content
      .replace(/\\&/g, '󰀀')
      .replace(/&\S/g, (m) => m.replace('&', '§'))
      .replace(/󰀀/g, '&');

    const canvas = render(<text size={size}>{text}</text>);
    const buffer = await canvas.toBuffer('png');

    return {
      files: [{ data: buffer, name: 'text.png', type: 'image/png' }],
    };
  }
}
