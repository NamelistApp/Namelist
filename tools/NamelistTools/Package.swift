// swift-tools-version: 5.10
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "NamelistTools",
    products: [
        .executable(name: "NamelistTools", targets: ["NamelistTools"]),
    ],
    dependencies: [
        .package(url: "https://github.com/jpsim/Yams.git", from: "5.1.2")
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .executableTarget(
            name: "NamelistTools",
            dependencies: [
                .product(name: "Yams", package: "Yams")
            ],
            path: "Sources"
        ),
    ]
)
