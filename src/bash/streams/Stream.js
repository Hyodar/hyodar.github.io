
class Stream {
    constructor(in_stream, out_stream, error_stream) {
        this.inp = {
            read: () => in_stream.read()
        }

        this.out = {
            write: (data) => out_stream.write(data)
        };

        this.err = {
            write: (data) => error_stream.write(data)
        }
    }
}

export default Stream;