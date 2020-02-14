
function echo(args, stream, piped) {
    stream.out.write(args.join("\u{0020}"));
}

export default echo;