import { GameService } from "./GameService";
import { RendererService } from "./RendererService";



export class ViewportController {
	private _canvas: HTMLCanvasElement;
	private _rendererService: RendererService;
	private _gameService: GameService;

	constructor(canvas: HTMLCanvasElement,  divElement:HTMLDivElement) {
		this._canvas = canvas;
		this._rendererService = new RendererService(canvas);
		this._gameService = new GameService(this._rendererService, divElement);

		this._rendererService.startRendering();
	}

	setSize(width: number, height: number) {
		this._rendererService.setSize(width, height);
	}
}
