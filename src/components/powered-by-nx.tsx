import clsx from "clsx";
import React from "react";
import styles from "./powered-by-nx.module.css";

export default function PoweredByNx(): JSX.Element {
  return (
    <section className="padding-vert--xl container">
      <div className={clsx("row row--no-gutters shadow--md", styles.item)}>
        <div
          className="col col--6"
          aria-hidden="true"
          style={{
            backgroundImage: "url('/images/background/rocket.avif')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <div className={clsx("col col--6", styles.item__inner)}>
          <div>
            <h1 className={clsx("margin-bottom--md", styles.item__title)}>
              静态检查
            </h1>
            <p className="margin-bottom--md">
              静态类型是ArkTS最重要的特性之一。使用静态类型，程序中变量的类型是确定的，
              编译器可以验证代码的正确性，从而减少运行时的类型检查，有助于性能提升。
            </p>
            <a className="button button--secondary" href="/">
              了解更多
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
