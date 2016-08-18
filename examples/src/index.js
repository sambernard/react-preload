import ExamplePlayer from './ExamplePlayer';
import { Example1 } from './Examples';

const wrapPlayer = (Component) => {
    return <ExamplePlayer><Component /></ExamplePlayer>;
}

ReactDOM.render(wrapPlayer(Example1), document.getElementById('example1'));
