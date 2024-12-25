struct Event {
    let name: String
    let action: String
    let description: String
    var properties: [Property]

    init(name: String, yaml: Any) {
        guard let yaml = yaml as? [String: Any] else {
            fatalError("Invalid Yaml")
        }

        guard let action = yaml["action"] as? String,
              let description = yaml["description"] as? String else {
            fatalError("Invalid Yaml")
        }

        if let properties = yaml["properties"] as? [String: Any] {
            self.properties = properties.map {
                Property(name: $0, yaml: $1)
            }
        } else {
            self.properties = []
        }

        self.properties.sort(by: { $0.name < $1.name })

        self.name = name
        self.action = action
        self.description = description
    }

    var asSwift: String {
        var output = """
\t/// \(description)
\tstruct \(name): InternalEvent {
\t\tlet action = "\(action)"\n
"""

        for property in properties {
            output.append("\t\t\(property.asSwift)\n")
        }

        output.append("\t\tvar properties: [String: Any?] {\n")

        if properties.isEmpty {
            output.append("\t\t\t[:]")
        } else {
            output.append("\t\t\t[\n")
            for property in properties {
                output.append("\t\t\t\t\"\(property.name)\": \(property.safeName),\n")
            }
            output.append("\t\t\t]")
        }
        
        output.append("\n\t\t}\n\t}")

        return output
    }

    var asJavascript: String {
        var jsOutput = """
{
    name: "\(name)",
    action: "\(action)",
    description: "\(description)",
    properties: {
"""

        for (index, property) in properties.enumerated() {
            jsOutput.append("\t\t\"\(property.name)\": \(property.asJavascript)")
            if index < properties.count - 1 {
                jsOutput.append(",\n")
            }
        }

        jsOutput.append("\n\t}\n}")

        return jsOutput
    }
}
