import Component from "./Component.js";
import {
  clearInputValue,
  createButtonHTMLElement,
  createDivHTMLElement,
  createInputTextHTMLElement,
  createLabelHTMLElement
} from "./util.js";

export default class StationManager extends Component {
  constructor({ $parent }) {
    super({ $parent });

    this.declareConstants();
    this.initializeState(); 

    this.constructHTMLElements();
    this.addClickEventListener();
    this.appendChildNodes();
    
    clearInputValue(this.$stationNameInput);
  }

  declareConstants() {
    this.STATION_DELETE_BUTTON_CLASSNAME = "station-delete-button";
  }

  initializeState() {
    this.state = {
      stationName: []
    };
  }

  constructHTMLElements() {
    this.$stationNameLabel = this.createStationNameLabel();
    this.$stationNameInput = this.createStationNameInput();
    this.$stationAddButton = this.createStationAddButton();

    this.$stationNameList = createDivHTMLElement({});

    this.childNodes = [this.$stationNameLabel, this.$stationNameInput, this.$stationAddButton, this.$stationNameList];
  }

  createStationNameLabel() {
    return createLabelHTMLElement({
      name: "역 이름",
      htmlFor: "station-name-input"
    });
  }

  createStationNameInput() {
    return createInputTextHTMLElement({
      id: "station-name-input",
      onKeydown: e => {
        if (e.key === "Enter") {
          this.handleStationAdd();
        }
      }
    });
  }

  createStationAddButton() {
    return createButtonHTMLElement({
      id: "station-add-button",
      name: "역 추가",
    });
  }

  addClickEventListener() {
    this.$component.addEventListener("click", e => {
      const { target: { id, classList } } = e;
      const { target: { dataset: { stationNameIndex } } } = e;

      if (id === this.$stationAddButton.id) {
        this.handleStationAdd();
      } else if (classList.contains(this.STATION_DELETE_BUTTON_CLASSNAME)) {
        this.handleDeleteButton(stationNameIndex);
      }
    });
  }

  handleStationAdd() {
    const newStationName = this.$stationNameInput.value;
    if (this.isValidStationName(newStationName)) {
      this.addNewStationName(newStationName);    
      clearInputValue(this.$stationNameInput);
    }
  }

  isValidStationName(stationNameUserInput) {
    try {
      this.validateUniqueStationName(stationNameUserInput);
      this.validateStationNameLength(stationNameUserInput);

      return true;
    } catch (error) {
      this.controlStationNameError(stationNameUserInput, error);

      return false;      
    }
  }

  validateUniqueStationName(stationNameUserInput) {
    const { stationName } = this.state;

    if (stationName.includes(stationNameUserInput)) {
      throw new Error("중복된 지하철 역 이름은 등록될 수 없습니다.");
    }
  }

  validateStationNameLength(stationNameUserInput) {
    const MIN_STATION_NAME_LENGTH = 2;

    if (stationNameUserInput.length < MIN_STATION_NAME_LENGTH) {
      throw new Error("지하철 역은 2글자 이상이어야 합니다.");
    }
  }

  controlStationNameError(stationNameUserInput, error) {
    const alertMessage = [
      `입력된 지하철 역 이름: ${stationNameUserInput}`,
      `${error.message}`,
      `다시 입력해주세요`
    ].join("\n");

    alert(alertMessage);
    clearInputValue(stationNameUserInput);
  }

  addNewStationName(newStationName) {
    this.setState({
      stationName: [
        ...this.state.stationName,
        newStationName
      ]
    });
  }

  handleDeleteButton(targetIndex) {
    const targetStationName = this.state.stationName[targetIndex];
      
    if (confirm(`${targetStationName}을 삭제하시겠습니까?`)) {
      const targetExcluded = this.state.stationName.filter(stationName => stationName !== targetStationName);
      this.setStationNameArray(targetExcluded);
    }
  }

  setStationNameArray(stationName) {
    this.setState({ stationName });
  }

  appendChildNodes() {
    this.$component.append(...this.childNodes);
  }

  render() {
    this.$stationNameList.innerHTML = "<div>🚉 지하철 역 목록</div>";
    const $childNodes = this.state.stationName.reduce((acc, stationName, index) => {
      const $stationName = createDivHTMLElement({innerText: stationName});
      const $stationDeleteButton = createButtonHTMLElement({
        name: "삭제",
        classList: [this.STATION_DELETE_BUTTON_CLASSNAME],
        dataset: { "stationNameIndex": index }
      });

      return [...acc, $stationName, $stationDeleteButton];
    }, []);

    this.$stationNameList.append(...$childNodes);
  }
}