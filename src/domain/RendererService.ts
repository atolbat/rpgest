import { PCFSoftShadowMap, WebGLRenderer, sRGBEncoding } from "three";

const SHADOW_MAP_TYPE = PCFSoftShadowMap;
const DEFAULT_CTX_ATTRIBUTES = {};

type RenderCallbackOptions = {
	renderer: WebGLRenderer;
	width: number;
	height: number;
	needsResize: boolean;
};

export class RendererService {
	private _canvas: HTMLCanvasElement | OffscreenCanvas;
	private _ctx: WebGL2RenderingContext;
	private _size = {
		width: 0,
		height: 0,
		needsResize: true,
	};
	private _lastElapsedTime = 0;
	private _rafID = -1;
	private _isRenderingActive = false;

	renderer: WebGLRenderer;
	needsShadows = false;

	rendererCallback = (
		delta: number,
		elapsedTime: number,
		options: RenderCallbackOptions
	) => {
		// Placeholder for actual implementation
	};

	constructor(
		canvas: HTMLCanvasElement | OffscreenCanvas,
		needsShadows = true
	) {
		this._canvas = canvas;
		this._ctx = canvas.getContext(
			"webgl2",
			DEFAULT_CTX_ATTRIBUTES
		) as WebGL2RenderingContext;

		this.renderer = new WebGLRenderer({
			context: this._ctx,
			premultipliedAlpha: true,
			antialias: true,
		});

		this.renderer.outputEncoding = sRGBEncoding;

		if (needsShadows) {
			this.needsShadows = true;
			this.renderer.shadowMap.enabled = true;
			this.renderer.shadowMap.type = SHADOW_MAP_TYPE;
		}
	}

	private _innerRafCB = (elapsedTime: number) => {
		this._rafID = requestAnimationFrame(this._innerRafCB);

		const delta = elapsedTime - this._lastElapsedTime;
		this._lastElapsedTime = elapsedTime;

		const { width, height, needsResize } = this._size;
		this.rendererCallback(delta, elapsedTime, {
			renderer: this.renderer,
			width,
			height,
			needsResize,
		});

		if (!needsResize) {
			return;
		}

		this._size.needsResize = false;

		this._canvas.width = width;
		this._canvas.height = height;

		this.renderer.setViewport(0, 0, width, height);
	};

	startRendering() {
		if (this._isRenderingActive) {
			return;
		}

		this._innerRafCB(this._lastElapsedTime);
		this._isRenderingActive = true;
	}

	stopRendering() {
		if (!this._isRenderingActive) {
			return;
		}

		cancelAnimationFrame(this._rafID);

		this._rafID = -1;
		this._isRenderingActive = false;
	}

	setSize(width: number, height: number) {
		this._size.width = width;
		this._size.height = height;
		this._size.needsResize = true;
	}
}
