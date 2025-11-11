import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./hero-lerna.module.css";
import LernaIcon from "./lerna-icon";

export default function HeroLerna(): JSX.Element {
  const command = "npx lerna init";

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (copied) {
      t = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
    return () => {
      t && clearTimeout(t);
    };
  }, [copied]);

  return (
    <section className="padding-vert--xl">
      <div className="container">
        <div className="row">
          <div className="col col--8 margin-vert--xl">
            <h1 className={styles.slogan}> 
              <span className={styles.slogan__highlight}>ArkTS 编程语言</span>
            </h1>
            <p className={styles.description}>
              ArkTS 是 HarmonyOS 应用开发语言，在继承 TypeScript 核心语法特性的基础上，构建规范化的类型系统，通过编译期静态检查与分析机制，
              提升代码健壮性，并实现更好的运行性能，更简洁、更自然开发高性能应用。
            </p>
            <div className="padding-vert--md row">
              <div className="col col--5">
                <a href="/docs/intro" className="button button--lg button--block button--primary">
                  快速开始
                </a>
              </div>

            </div>
          </div>
          <div className="col col--4">
            <div className={styles.illustration}>
              <div
                className={styles.illustration__container}
                
              >
                <LernaIcon className={styles.illustration__svg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
