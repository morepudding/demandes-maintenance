import { prettyDOM } from "@testing-library/dom";

export interface LogObject {
    container: {
        firstChild: HTMLElement;
    };
}

export const logPage = (rendered: LogObject) => {
    console.log(prettyDOM(rendered.container.firstChild));
};
