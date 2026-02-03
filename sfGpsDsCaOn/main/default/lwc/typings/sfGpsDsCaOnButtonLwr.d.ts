declare module "c/sfGpsDsCaOnButtonLwr" {
  import type SfGpsDsLwc from "c/sfGpsDsLwc";
  import type { NavigationMixin } from "lightning/navigation";

  export default 
  class SfGpsDsCaOnButtonLwr
  extends NavigationMixin<SfGpsDsLwc>(SfGpsDsLwc) {
    ariaLabelText?: string;
    elementId?: string;
    htmlType?: string;
    label?: string;
    url?: string;
    type?: string;
    className?: string;

    // private

    handleClick(_event: MouseEvent): void;
  }
}
