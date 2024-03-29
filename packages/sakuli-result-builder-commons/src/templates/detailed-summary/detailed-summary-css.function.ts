import {oneLineTrim} from "common-tags";

export default () => oneLineTrim`
<style>
    .modalDialog {
        width: 640px;
    }

    .modalDialog:target {
        width: auto;
        margin: 20px auto;
        overflow: scroll;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99999;
        opacity: 1;
        pointer-events: auto;
    }

    .modalDialog:target .close {
        display: block;
    }

    .modalDialog:target .screenshot {
        width: 100%;
        border: 2px solid #333;
    }

    .screenshot {
        width: 98%;
        border: 2px solid  gray;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 4px;
        cursor: -webkit-zoom-in;
        cursor: -moz-zoom-in;
    }

    .close {
        display: none;
        background: #aaa;
        color: #fff;
        line-height: 25px;
        position: absolute;
        right: 10px;
        text-align: center;
        top: 25px;
        width: 65px;
        text-decoration: none;
        font-weight: bold;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
    }

    .close:hover {
        background: #333;
    }
</style>
`;