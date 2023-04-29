import {
	AmbientLight,
	DirectionalLight,
	PerspectiveCamera,
	Scene,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { RendererService } from "./RendererService";

export class GameService {
	private rendererService: RendererService;
	private stats: Stats;
	private camera: PerspectiveCamera;
	private scene: Scene;
	private ambientLight: AmbientLight;
	private directionalLight: DirectionalLight;
	private orbitController: OrbitControls;

	constructor(rendererService: RendererService, viewportElement: HTMLElement) {
		this.rendererService = rendererService;

		this.stats = new Stats();
		document.body.appendChild(this.stats.dom);

		this.scene = new Scene();
		this.camera = new PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.01,
			10
		);

		this.ambientLight = new AmbientLight(0xffffff, 0.1);
		this.directionalLight = new DirectionalLight(0xffffff, 0.4);

		if (rendererService.needsShadows) {
			this.directionalLight.castShadow = true;
			this.directionalLight.shadow.camera.near = 0.1;
			this.directionalLight.shadow.camera.far = 2;
			this.directionalLight.shadow.bias = 0.0001;
			this.directionalLight.shadow.mapSize.width = 512;
			this.directionalLight.shadow.mapSize.height = 512;
			this.directionalLight.position.set(1, 0.7, 0.7);
		}

		this.orbitController = new OrbitControls(this.camera, viewportElement);
		this.orbitController.enableZoom = true;

		const scene = this.scene;
		scene.add(this.ambientLight, this.directionalLight);

		this.camera.position.z = 2;
		this.camera.position.y = 1;

		this.rendererService.rendererCallback = (
			delta: number,
			elapsedTime: number,
			options: {
				renderer: any;
				width: number;
				height: number;
				needsResize: boolean;
			}
		) => {
			if (options.needsResize) {
				this.camera.aspect = options.width / options.height;
				this.camera.updateProjectionMatrix();
			}

			this.orbitController.update();
			this.stats.update();

			options.renderer.render(this.scene, this.camera);
		};
	}
}
